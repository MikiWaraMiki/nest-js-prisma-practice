import { Module } from "@nestjs/common";
import { InfraModule } from "src/infra/infra.module";
import { TestCommand } from "./test/test.batch";

@Module({
  imports: [
    InfraModule
  ],
  providers: [
    TestCommand
  ]
})
export class BatchModule{}
