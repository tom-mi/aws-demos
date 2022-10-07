import * as cdk from 'aws-cdk-lib';
import {Cluster, ContainerImage, FargateService, FargateTaskDefinition, LogDriver, Protocol} from 'aws-cdk-lib/aws-ecs';
import {Construct} from 'constructs';
import {Peer, Port, SecurityGroup, Vpc} from "aws-cdk-lib/aws-ec2";
import {DnsRecordType, PrivateDnsNamespace} from "aws-cdk-lib/aws-servicediscovery";
import {HttpApi, VpcLink} from "@aws-cdk/aws-apigatewayv2-alpha";
import {HttpServiceDiscoveryIntegration} from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import {CfnOutput} from "aws-cdk-lib";

export class CloudMapDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', {});

    const cluster = new Cluster(this, 'Cluster', {vpc: vpc, clusterName: 'cloud-map-demo'});

    const image = ContainerImage.fromRegistry("httpd:2.4");

    const taskDefinition = new FargateTaskDefinition(this, 'TaskDefinition');
    taskDefinition.addContainer('app', {
      image,
      entryPoint: ['/bin/sh', '-c'],
      command: ["/bin/sh -c \"echo 'Hello World! My name is $(hostname)' > /usr/local/apache2/htdocs/index.html && httpd-foreground\""],
      portMappings: [{containerPort: 80, protocol: Protocol.TCP}],
    });

    const namespace = new PrivateDnsNamespace(this, 'Namespace', {
      vpc,
      name: 'cloud-map-demo',
    });

    const securityGroup = new SecurityGroup(this, 'SecurityGroup', {
      vpc,
      securityGroupName: 'cloud-map-demo-ecs',
    });
    securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(80));

    const service = new FargateService(this, 'Service', {
      cluster: cluster,
      securityGroups: [securityGroup],
      taskDefinition: taskDefinition,
      desiredCount: 2,
      cloudMapOptions: {
        name: 'hello',
        cloudMapNamespace: namespace,
        dnsRecordType: DnsRecordType.SRV,
      },
    });

    const vpcLink = new VpcLink(this, 'VpcLink', {vpc});
    const api = new HttpApi(this, 'HttpApi', {
      apiName: 'cloud-map-demo',
    });

    const integration = new HttpServiceDiscoveryIntegration('hello', service.cloudMapService!!, {
      vpcLink,
    });

    api.addRoutes({
      path: '/{path+}',
      integration: integration,
    });

    new CfnOutput(this, 'HttpApiUrlOutput', {
      value: api.url!!,
    });
  }
}
