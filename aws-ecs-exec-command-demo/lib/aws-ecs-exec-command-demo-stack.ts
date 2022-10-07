import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {
  Cluster,
  ContainerImage,
  Ec2TaskDefinition,
  FargateService,
  FargateTaskDefinition,
  Protocol
} from "aws-cdk-lib/aws-ecs";
import {Vpc} from "aws-cdk-lib/aws-ec2";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsEcsExecCommandDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc');
    const cluster = new Cluster(this, 'Cluster', {
      clusterName: 'ecs-exec-command-demo',
      vpc
    });

    const image = ContainerImage.fromRegistry("httpd:2.4-alpine");
    const taskDefinition = new FargateTaskDefinition(this, `TaskDefinition`);
    taskDefinition.addContainer('app', {
      image,
      entryPoint: ['/bin/sh', '-c'],
      command: [`/bin/sh -c "echo 'Hello World! My hostname is $(hostname)' > /usr/local/apache2/htdocs/index.html && httpd-foreground"`],
      portMappings: [
        {containerPort: 80, protocol: Protocol.TCP},
      ],
    });
    new FargateService(this, 'Service', {
      enableExecuteCommand: true,
      cluster,
      taskDefinition,
    });
  }
}
