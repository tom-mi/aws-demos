#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CloudMapDemoStack} from "../lib/cloud-map-demo-stack";

const app = new cdk.App();
new CloudMapDemoStack(app, 'AwsCloudMapCdkDemoStack', {
  stackName: 'cloud-map-demo',
});
