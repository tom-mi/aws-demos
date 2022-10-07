#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsEcsExecCommandDemoStack } from '../lib/aws-ecs-exec-command-demo-stack';

const app = new cdk.App();
new AwsEcsExecCommandDemoStack(app, 'AwsEcsExecCommandDemoStack', {
  stackName: 'ecs-exec-command-demo',
});
