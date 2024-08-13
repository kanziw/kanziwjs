// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts"
// @generated from file example/v1/example.proto (package echo.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AddRequest, AddResponse, ChatRequest, ChatResponse, EchoRequest, EchoResponse, EchoStreamRequest, EchoStreamResponse, StreamEchoRequest, StreamEchoResponse } from "./example_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service echo.v1.ExampleService
 */
export const ExampleService = {
  typeName: "echo.v1.ExampleService",
  methods: {
    /**
     * @generated from rpc echo.v1.ExampleService.Echo
     */
    echo: {
      name: "Echo",
      I: EchoRequest,
      O: EchoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc echo.v1.ExampleService.EchoStream
     */
    echoStream: {
      name: "EchoStream",
      I: EchoStreamRequest,
      O: EchoStreamResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc echo.v1.ExampleService.StreamEcho
     */
    streamEcho: {
      name: "StreamEcho",
      I: StreamEchoRequest,
      O: StreamEchoResponse,
      kind: MethodKind.ClientStreaming,
    },
    /**
     * @generated from rpc echo.v1.ExampleService.Chat
     */
    chat: {
      name: "Chat",
      I: ChatRequest,
      O: ChatResponse,
      kind: MethodKind.BiDiStreaming,
    },
    /**
     * @generated from rpc echo.v1.ExampleService.Add
     */
    add: {
      name: "Add",
      I: AddRequest,
      O: AddResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

