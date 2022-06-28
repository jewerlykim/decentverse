/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import { Decentverse, srv, db } from "decentverse";
import * as fs from "fs";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  const decentverse = new Decentverse({
    objectStorage: {
      region: "ap-northeast-2",
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      bucket: process.env.ASSET_BUCKET_NAME,
      host: process.env.ASSET_BUCKET_HOST,
      distributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
    },
    redis: { url: process.env.REDIS_URL },
    mongo: {
      uri: process.env.MONGO_URI,
      dbName: process.env.DB_NAME,
      replSet: process.env.DB_REPLICA_SET,
    },
    klaytn: {
      address: process.env.WALLET_ADDR,
      privateKey: process.env.WALLET_PRIVATE_KEY,
      chainId: process.env.KLAYTN_CHAIN_ID,
      accessKeyId: process.env.KLAYTN_ACCESS_KEY_ID,
      secretAccessKey: process.env.KLAYTN_SECRET_ACCESS_KEY,
    },
  });

  await decentverse.init();
  // const fileService = decentverse.app.get<srv.FileService>(srv.FileService);
  // const mapService = decentverse.app.get<srv.MapService>(srv.MapService);
  // const assetService = decentverse.app.get<srv.AssetService>(srv.AssetService);
  // const characterService = decentverse.app.get<srv.CharacterService>(
  //   srv.CharacterService
  // );
  // const fileModel = decentverse.app.get<Model<db.File.Doc>>(
  //   getModelToken(db.File.File.name)
  // );
  // const path = `apps/backend/src/assets/characters`;
  // const files = {
  //   idle: await fileService.addFileFromLocal({
  //     localPath: path,
  //     filename: "m_idle.gif",
  //     mimetype: "image/gif",
  //     encoding: "7bit",
  //   }),
  //   walk: await fileService.addFileFromLocal({
  //     localPath: path,
  //     filename: "m_walk.gif",
  //     mimetype: "image/gif",
  //     encoding: "7bit",
  //   }),
  // };
  // const character = await characterService.createCharacter({
  //   tokenId: 0,
  //   right: {
  //     idle: <any>files.idle._id,
  //     walk: <any>files.walk._id,
  //   },
  // });
  // const files = await fileModel.find({});
}

bootstrap();
