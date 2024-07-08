import { describe, it } from "vitest"
import { ExpectResponse, Response } from "../src"

// 模拟 axios 响应
const mockAxiosResponse = (status: number, headers: any, data: any): Response<any> =>
  ({
    status,
    headers,
    data,
    href: "/test"
  }) as any

describe("ExpectResponse", () => {
  it("should test headers correctly", async () => {
    const response = mockAxiosResponse(200, { "content-type": "application/json" }, {})
    const testResponse = new ExpectResponse(response)
    await testResponse.expectHeader("content-type", "application/json").done()
  })

  it("should test status correctly", async () => {
    const response = mockAxiosResponse(200, {}, {})
    const testResponse = new ExpectResponse(response)
    await testResponse.expectStatus(200).done()
  })

  it("should test body correctly", async () => {
    const response = mockAxiosResponse(200, {}, { name: "John Doe" })
    const testResponse = new ExpectResponse(response)
    await testResponse.expectBody({ name: "John Doe" }).done()
  })

  it("should test body data correctly", async () => {
    const response = mockAxiosResponse(200, {}, { object: { name: "John Doe" }, success: true, code: 200, msg: "ok" })
    const testResponse = new ExpectResponse(response)
    await testResponse.expectBodyData({ name: "John Doe" }).done()
  })

  it("should test header keys existence correctly", async () => {
    const response = mockAxiosResponse(200, { "content-type": "application/json", authorization: "Bearer token" }, {})
    const testResponse = new ExpectResponse(response)
    await testResponse.expectHasHeader("content-type").expectHasHeader("authorization").done()
  })

  it("should filter body correctly", async () => {
    const response = mockAxiosResponse(200, {}, { name: "John Doe", age: 30 })
    const testResponse = new ExpectResponse(response)
    await testResponse
      .filterBody((data) => ({ ...data, age: data.age + 1 }))
      .expectBody({ name: "John Doe", age: 31 })
      .done()
  })
})
