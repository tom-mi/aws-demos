# aws-cloud-map-cdk-demo

Deploys a minimal AWS Cloud Map demo consisting of
* a VPC
* a ECS Fargate cluster
* a AWS Cloud Map private DNS namespace
* a simple ECS service running one instance of the AWS ECS sample container, registered as a service in the Cloud Map namespace
* a AWS Api Gateway HTTP API using an integration with the Cloud Map service

After deployment, the service is reachable via the URL of the HTTP API (see output of `cdk deploy`).

## Useful commands

* `npm ci`                     install dependencies
* `npm run cdk -- deploy`      deploy this stack to your default AWS account/region
* `npm run cdk -- diff`        compare deployed stack with current state
* `npm run cdk -- synth`       emits the synthesized CloudFormation template
