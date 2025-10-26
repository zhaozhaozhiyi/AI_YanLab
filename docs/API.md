# AIE API 文档

## 概述

对话应用支持会话持久化，可将之前的聊天记录作为上下文进行回答，适用于聊天/客服 AI 等场景。

**Base URL:** `http://aie.wenge.com:30051/v1`

**状态:** 运行中

## 鉴权

Service API 使用 API-Key 进行鉴权。强烈建议开发者把 API-Key 放在后端存储，而非分享或者放在客户端存储，以免 API-Key 泄露，导致财产损失。

所有 API 请求都应在 Authorization HTTP Header 中包含您的 API-Key：

```
Authorization: Bearer {API_KEY}
```

---

## 对话型应用 API

### 发送对话消息

创建会话消息。

**Endpoint:** `POST /chat-messages`

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| query | string | 用户输入/提问内容 |
| inputs | object | 允许传入 App 定义的各变量值。inputs 参数包含了多组键值对（Key/Value pairs），每组的键对应一个特定变量，每组的值则是该变量的具体值。默认 {} |
| response_mode | string | streaming 流式模式（推荐）。基于 SSE（Server-Sent Events）实现类似打字机输出方式的流式返回。<br>blocking 阻塞模式，等待执行完毕后返回结果。（请求若流程较长可能会被中断）。由于 Cloudflare 限制，请求会在 100 秒超时无返回后中断。注：Agent模式下不允许blocking。 |
| user | string | 用户标识，用于定义终端用户的身份，方便检索、统计。由开发者定义规则，需保证用户标识在应用内唯一 |
| conversation_id | string | （选填）会话 ID，需要基于之前的聊天记录继续对话，必须传之前消息的 conversation_id |
| files | array[object] | 上传的文件 |
| auto_generate_name | bool | （选填）自动生成标题，默认 true。若设置为 false，则可通过调用会话重命名接口并设置 auto_generate 为 true 实现异步生成标题 |

**files 对象结构：**
- `type` (string): 支持类型：图片 image（目前仅支持图片格式）
- `transfer_method` (string): 传递方式
  - `remote_url`: 图片地址
  - `local_file`: 上传文件
- `url` (string): 图片地址（仅当传递方式为 remote_url 时）
- `upload_file_id` (string): 上传文件 ID（仅当传递方式为 local_file 时）

#### 响应

当 `response_mode` 为 `blocking` 时，返回 ChatCompletionResponse object。  
当 `response_mode` 为 `streaming` 时，返回 ChunkChatCompletionResponse object 流式序列。

**ChatCompletionResponse**  
返回完整的 App 结果，Content-Type 为 `application/json`

- `message_id` (string) 消息唯一 ID
- `conversation_id` (string) 会话 ID
- `mode` (string) App 模式，固定为 chat
- `answer` (string) 完整回复内容
- `metadata` (object) 元数据
- `usage` (Usage) 模型用量信息
- `retriever_resources` (array[RetrieverResource]) 引用和归属分段列表
- `created_at` (int) 消息创建时间戳，如：1705395332

**ChunkChatCompletionResponse**  
返回 App 输出的流式块，Content-Type 为 `text/event-stream`。每个流式块均为 `data:` 开头，块之间以 `\n\n` 即两个换行符分隔。

流式块中根据 event 不同，结构也不同：

| Event | 说明 |
|-------|------|
| `message` | LLM 返回文本块事件，即：完整的文本以分块的方式输出 |
| `agent_message` | Agent模式下返回文本块事件，即：在Agent模式下，文章的文本以分块的方式输出（仅Agent模式下使用） |
| `agent_thought` | Agent模式下有关Agent思考步骤的相关内容，涉及到工具调用（仅Agent模式下使用） |
| `message_file` | 文件事件，表示有新文件需要展示 |
| `message_end` | 消息结束事件，收到此事件则代表流式返回结束 |
| `tts_message` | TTS 音频流事件，即：语音合成输出。内容是Mp3格式的音频块，使用 base64 编码后的字符串，播放的时候直接解码即可 |
| `tts_message_end` | TTS 音频流结束事件，收到这个事件表示音频流返回结束 |
| `message_replace` | 消息内容替换事件。开启内容审查和审查输出内容时，若命中了审查条件，则会通过此事件替换消息内容为预设回复 |
| `error` | 流式输出过程中出现的异常会以 stream event 形式输出，收到异常事件后即结束 |
| `ping` | 每 10s 一次的 ping 事件，保持连接存活 |

#### 错误码

- `404` 对话不存在
- `400` invalid_param，传入参数异常
- `400` app_unavailable，App 配置不可用
- `400` provider_not_initialize，无可用模型凭据配置
- `400` provider_quota_exceeded，模型调用额度不足
- `400` model_currently_not_support，当前模型不可用
- `400` completion_request_error，文本生成失败
- `500` 服务内部异常

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/chat-messages' \
  --header 'Authorization: Bearer {api_key}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "inputs": {},
      "query": "What are the specs of the iPhone 13 Pro Max?",
      "response_mode": "streaming",
      "conversation_id": "",
      "user": "abc-123",
      "files": [
        {
          "type": "image",
          "transfer_method": "remote_url",
          "url": "https://cloud.dify.ai/logo/logo-site.png"
        }
      ]
  }'
```

#### 响应示例

**阻塞模式响应：**

```json
{
  "event": "message",
  "message_id": "9da23599-e713-473b-982c-4328d4f5c78a",
  "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2",
  "mode": "chat",
  "answer": "iPhone 13 Pro Max specs are listed here:...",
  "metadata": {
    "usage": {
      "prompt_tokens": 1033,
      "prompt_unit_price": "0.001",
      "prompt_price_unit": "0.001",
      "prompt_price": "0.0010330",
      "completion_tokens": 128,
      "completion_unit_price": "0.002",
      "completion_price_unit": "0.001",
      "completion_price": "0.0002560",
      "total_tokens": 1161,
      "total_price": "0.0012890",
      "currency": "USD",
      "latency": 0.7682376249867957
    },
    "retriever_resources": [
      {
        "position": 1,
        "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
        "dataset_name": "iPhone",
        "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
        "document_name": "iPhone List",
        "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
        "score": 0.98457545,
        "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""
      }
    ]
  },
  "created_at": 1705407629
}
```

**流式模式响应（基础助手）：**

```
data: {"event": "message", "message_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "answer": " I", "created_at": 1679586595}

data: {"event": "message", "message_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "answer": "'m", "created_at": 1679586595}

data: {"event": "message", "message_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "answer": " glad", "created_at": 1679586595}

data: {"event": "message", "message_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "answer": " to", "created_at": 1679586595}

data: {"event": "message", "message_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "answer": " meet", "created_at": 1679586595}

data: {"event": "message", "message_id": "5ad4cb98-f0c7-4085-b384-88c403be6290", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "answer": " you", "created_at": 1679586595}

data: {"event": "message_end", "id": "5e52ce04-874b-4d27-9045-b3bc80def685", "conversation_id": "45701982-8118-4bc5-8e9b-64562b4555f2", "metadata": {"usage": {"prompt_tokens": 1033, "prompt_unit_price": "0.001", "prompt_price_unit": "0.001", "prompt_price": "0.0010330", "completion_tokens": 135, "completion_unit_price": "0.002", "completion_price_unit": "0.001", "completion_price": "0.0002700", "total_tokens": 1168, "total_price": "0.0013030", "currency": "USD", "latency": 1.381760165997548}, "retriever_resources": [{"position": 1, "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb", "dataset_name": "iPhone", "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00", "document_name": "iPhone List", "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a", "score": 0.98457545, "content": "\"Model\",\"Release Date\",\"Display Size\",\"Resolution\",\"Processor\",\"RAM\",\"Storage\",\"Camera\",\"Battery\",\"Operating System\"\n\"iPhone 13 Pro Max\",\"September 24, 2021\",\"6.7 inch\",\"1284 x 2778\",\"Hexa-core (2x3.23 GHz Avalanche + 4x1.82 GHz Blizzard)\",\"6 GB\",\"128, 256, 512 GB, 1TB\",\"12 MP\",\"4352 mAh\",\"iOS 15\""}]}}

data: {"event": "tts_message", "conversation_id": "23dd85f3-1a41-4ea0-b7a9-062734ccfaf9", "message_id": "a8bdc41c-13b2-4c18-bfd9-054b9803038c", "created_at": 1721205487, "task_id": "3bf8a0bb-e73b-4690-9e66-4e429bad8ee7", "audio": "..."}

data: {"event": "tts_message_end", "conversation_id": "23dd85f3-1a41-4ea0-b7a9-062734ccfaf9", "message_id": "a8bdc41c-13b2-4c18-bfd9-054b9803038c", "created_at": 1721205487, "task_id": "3bf8a0bb-e73b-4690-9e66-4e429bad8ee7", "audio": ""}
```

---

### 停止响应

仅支持流式模式。

**Endpoint:** `POST /chat-messages/:task_id/stop`

#### 路径参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| task_id | string | 任务 ID，可在流式返回 Chunk 中获取 |

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| user | string | 是 | 用户标识，用于定义终端用户的身份，必须和发送消息接口传入 user 保持一致 |

#### 响应

```json
{
  "result": "success"
}
```

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/chat-messages/:task_id/stop' \
  -H 'Authorization: Bearer {api_key}' \
  -H 'Content-Type: application/json' \
  --data-raw '{ "user": "abc-123"}'
```

---

## 文件管理 API

### 上传文件

上传文件（目前仅支持图片）并在发送消息时使用，可实现图文多模态理解。支持 png, jpg, jpeg, webp, gif 格式。上传的文件仅供当前终端用户使用。

**Endpoint:** `POST /files/upload`

> 该接口需使用 `multipart/form-data` 进行请求。

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| file | file | 要上传的文件 |
| user | string | 用户标识，用于定义终端用户的身份，必须和发送消息接口传入 user 保持一致 |

#### 响应

成功上传后，服务器会返回文件的 ID 和相关信息：

- `id` (uuid) ID
- `name` (string) 文件名
- `size` (int) 文件大小（byte）
- `extension` (string) 文件后缀
- `mime_type` (string) 文件 mime-type
- `created_by` (uuid) 上传人 ID
- `created_at` (timestamp) 上传时间

#### 错误码

- `400` no_file_uploaded，必须提供文件
- `400` too_many_files，目前只接受一个文件
- `400` unsupported_preview，该文件不支持预览
- `400` unsupported_estimate，该文件不支持估算
- `413` file_too_large，文件太大
- `415` unsupported_file_type，不支持的扩展名，当前只接受文档类文件
- `503` s3_connection_failed，无法连接到 S3 服务
- `503` s3_permission_denied，无权限上传文件到 S3
- `503` s3_file_too_large，文件超出 S3 大小限制

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/files/upload' \
  --header 'Authorization: Bearer {api_key}' \
  --form 'file=@localfile;type=image/png' \
  --form 'user=abc-123'
```

#### 响应示例

```json
{
  "id": "72fa9618-8f89-4a37-9b33-7e1178a24a67",
  "name": "example.png",
  "size": 1024,
  "extension": "png",
  "mime_type": "image/png",
  "created_by": 123,
  "created_at": 1577836800
}
```

---

## 消息管理 API

### 消息反馈（点赞）

消息终端用户反馈、点赞，方便应用开发者优化输出预期。

**Endpoint:** `POST /messages/:message_id/feedbacks`

#### 路径参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| message_id | string | 消息 ID |

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| rating | string | 点赞 like, 点踩 dislike, 撤销点赞 null |
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

```json
{
  "result": "success"
}
```

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/messages/:message_id/feedbacks' \
  --header 'Authorization: Bearer {api_key}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "rating": "like",
      "user": "abc-123"
  }'
```

---

### 获取下一轮建议问题列表

**Endpoint:** `GET /messages/{message_id}/suggested`

#### 路径参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| message_id | string | Message ID |

#### 查询参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

```json
{
  "result": "success",
  "data": [
    "a",
    "b",
    "c"
  ]
}
```

#### 请求示例

```bash
curl -X GET 'http://aie.wenge.com:30051/v1/messages/{message_id}/suggested?user=abc-123' \
  --header 'Authorization: Bearer ENTER-YOUR-SECRET-KEY' \
  --header 'Content-Type: application/json'
```

---

### 获取会话历史消息

滚动加载形式返回历史聊天记录，第一页返回最新 limit 条，即：倒序返回。

**Endpoint:** `GET /messages`

#### 查询参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| conversation_id | string | 会话 ID |
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |
| first_id | string | 当前页第一条聊天记录的 ID，默认 null |
| limit | int | 一次请求返回多少条聊天记录，默认 20 条 |

#### 响应

- `data` (array[object]) 消息列表
- `has_more` (bool) 是否存在下一页
- `limit` (int) 返回条数，若传入超过系统限制，返回系统限制数量

**data 对象结构：**
- `id` (string) 消息 ID
- `conversation_id` (string) 会话 ID
- `inputs` (array[object]) 用户输入参数
- `query` (string) 用户输入 / 提问内容
- `answer` (string) 回答消息内容
- `created_at` (timestamp) 创建时间
- `feedback` (object) 反馈信息
  - `rating` (string) 点赞 like / 点踩 dislike
- `message_files` (array[object]) 消息文件
  - `id` (string) ID
  - `type` (string) 文件类型，image 图片
  - `url` (string) 预览图片地址
  - `belongs_to` (string) 文件归属方，user 或 assistant
- `agent_thoughts` (array[object]) Agent思考内容（仅Agent模式下不为空）
- `retriever_resources` (array[RetrieverResource]) 引用和归属分段列表

#### 请求示例

```bash
curl -X GET 'http://aie.wenge.com:30051/v1/messages?user=abc-123&conversation_id=' \
  --header 'Authorization: Bearer {api_key}'
```

#### 响应示例（基础助手）

```json
{
  "limit": 20,
  "has_more": false,
  "data": [
    {
      "id": "a076a87f-31e5-48dc-b452-0061adbbc922",
      "conversation_id": "cd78daf6-f9e4-4463-9ff2-54257230a0ce",
      "inputs": {
        "name": "aie"
      },
      "query": "iphone 13 pro",
      "answer": "The iPhone 13 Pro, released on September 24, 2021, features a 6.1-inch display with a resolution of 1170 x 2532...",
      "message_files": [],
      "feedback": null,
      "retriever_resources": [
        {
          "position": 1,
          "dataset_id": "101b4c97-fc2e-463c-90b1-5261a4cdcafb",
          "dataset_name": "iPhone",
          "document_id": "8dd1ad74-0b5f-4175-b735-7d98bbbb4e00",
          "document_name": "iPhone List",
          "segment_id": "ed599c7f-2766-4294-9d1d-e5235a61270a",
          "score": 0.98457545,
          "content": "\"Model\",\"Release Date\"..."
        }
      ],
      "agent_thoughts": [],
      "created_at": 1705569239
    }
  ]
}
```

#### 响应示例（智能助手）

```json
{
  "limit": 20,
  "has_more": false,
  "data": [
    {
      "id": "d35e006c-7c4d-458f-9142-be4930abdf94",
      "conversation_id": "957c068b-f258-4f89-ba10-6e8a0361c457",
      "inputs": {},
      "query": "draw a cat",
      "answer": "I have generated an image of a cat for you. Please check your messages to view the image.",
      "message_files": [
        {
          "id": "976990d2-5294-47e6-8f14-7356ba9d2d76",
          "type": "image",
          "url": "http://127.0.0.1:5001/files/tools/976990d2-5294-47e6-8f14-7356ba9d2d76.png?timestamp=1705988524&nonce=55df3f9f7311a9acd91bf074cd524092&sign=z43nMSO1L2HBvoqADLkRxr7Biz0fkjeDstnJiCK1zh8=",
          "belongs_to": "assistant"
        }
      ],
      "feedback": null,
      "retriever_resources": [],
      "created_at": 1705988187,
      "agent_thoughts": [
        {
          "id": "592c84cf-07ee-441c-9dcc-ffc66c033469",
          "chain_id": null,
          "message_id": "d35e006c-7c4d-458f-9142-be4930abdf94",
          "position": 1,
          "thought": "",
          "tool": "dalle2",
          "tool_input": "{\"dalle2\": {\"prompt\": \"cat\"}}",
          "created_at": 1705988186,
          "observation": "image has been created and sent to user already, you should tell user to check it now.",
          "message_files": [
            "976990d2-5294-47e6-8f14-7356ba9d2d76"
          ]
        }
      ]
    }
  ]
}
```

---

## 会话管理 API

### 获取会话列表

获取当前用户的会话列表，默认返回最近的 20 条。

**Endpoint:** `GET /conversations`

#### 查询参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |
| last_id | string | 当前页最后面一条记录的 ID，默认 null |
| limit | int | 一次请求返回多少条记录 |
| pinned | bool | 只返回置顶 true，只返回非置顶 false |
| sort_by | string | 排序字段（选题），默认 -updated_at(按更新时间倒序排列)<br>可选值：created_at, -created_at, updated_at, -updated_at<br>字段前面的符号代表顺序或倒序，-代表倒序 |

#### 响应

- `data` (array[object]) 会话列表
  - `id` (string) 会话 ID
  - `name` (string) 会话名称，默认为会话中用户最开始问题的截取
  - `inputs` (array[object]) 用户输入参数
  - `introduction` (string) 开场白
  - `created_at` (timestamp) 创建时间
- `has_more` (bool)
- `limit` (int) 返回条数，若传入超过系统限制，返回系统限制数量

#### 请求示例

```bash
curl -X GET 'http://aie.wenge.com:30051/v1/conversations?user=abc-123&last_id=&limit=20' \
  --header 'Authorization: Bearer {api_key}'
```

#### 响应示例

```json
{
  "limit": 20,
  "has_more": false,
  "data": [
    {
      "id": "10799fb8-64f7-4296-bbf7-b42bfbe0ae54",
      "name": "New chat",
      "inputs": {
        "book": "book",
        "myName": "Lucy"
      },
      "status": "normal",
      "created_at": 1679667915
    }
  ]
}
```

---

### 删除会话

**Endpoint:** `DELETE /conversations/:conversation_id`

#### 路径参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| conversation_id | string | 会话 ID |

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

```json
{
  "result": "success"
}
```

#### 请求示例

```bash
curl -X DELETE 'http://aie.wenge.com:30051/v1/conversations/:conversation_id' \
  --header 'Authorization: Bearer {api_key}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "user": "abc-123"
  }'
```

---

### 会话重命名

对会话进行重命名，会话名称用于显示在支持多会话的客户端上。

**Endpoint:** `POST /conversations/:conversation_id/name`

#### 路径参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| conversation_id | string | 会话 ID |

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| name | string | 名称，若 auto_generate 为 true 时，该参数可不传 |
| auto_generate | string | 自动生成标题，默认 false |
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

- `id` (string) 会话 ID
- `name` (string) 会话名称
- `inputs` (array[object]) 用户输入参数
- `introduction` (string) 开场白
- `created_at` (timestamp) 创建时间

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/conversations/:conversation_id/name' \
  --header 'Authorization: Bearer {api_key}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "",
    "user": "abc-123"
  }'
```

#### 响应示例

```json
{
  "result": "success"
}
```

---

## 语音处理 API

### 语音转文字

**Endpoint:** `POST /audio-to-text`

> 该接口需使用 `multipart/form-data` 进行请求。

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| file | file | 语音文件。支持格式：mp3, mp4, mpeg, mpga, m4a, wav, webm。文件大小限制：15MB |
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

- `text` (string) 输出文字

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/audio-to-text' \
  --header 'Authorization: Bearer {api_key}' \
  --form 'file=@localfile;type=audio/mp3'
```

#### 响应示例

```json
{
  "text": "hello"
}
```

---

### 文字转语音

**Endpoint:** `POST /text-to-audio`

#### 请求参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| message_id | str | AIE 生成的文本消息，那么直接传递生成的message-id 即可，后台会通过 message_id 查找相应的内容直接合成语音信息。如果同时传 message_id 和 text，优先使用 message_id |
| text | str | 语音生成内容。如果没有传 message-id 的话，则会使用这个字段的内容 |
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 请求示例

```bash
curl -X POST 'http://aie.wenge.com:30051/v1/text-to-audio' \
  --header 'Authorization: Bearer ENTER-YOUR-SECRET-KEY' \
  --form 'text=你好AIE;user=abc-123;message_id=5ad4cb98-f0c7-4085-b384-88c403be6290'
```

#### 响应头

```
Content-Type: audio/wav
```

---

## 应用配置 API

### 获取应用配置信息

用于进入页面一开始，获取功能开关、输入参数名称、类型及默认值等使用。

**Endpoint:** `GET /parameters`

#### 查询参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

- `opening_statement` (string) 开场白
- `suggested_questions` (array[string]) 开场推荐问题列表
- `suggested_questions_after_answer` (object) 启用回答后给出推荐问题
  - `enabled` (bool) 是否开启
- `speech_to_text` (object) 语音转文本
  - `enabled` (bool) 是否开启
- `retriever_resource` (object) 引用和归属
  - `enabled` (bool) 是否开启
- `annotation_reply` (object) 标记回复
  - `enabled` (bool) 是否开启
- `user_input_form` (array[object]) 用户输入表单配置
- `file_upload` (object) 文件上传配置
- `system_parameters` (object) 系统参数

**user_input_form 结构：**
- `text-input` (object) 文本输入控件
  - `label` (string) 控件展示标签名
  - `variable` (string) 控件 ID
  - `required` (bool) 是否必填
  - `default` (string) 默认值
- `paragraph` (object) 段落文本输入控件
  - `label` (string) 控件展示标签名
  - `variable` (string) 控件 ID
  - `required` (bool) 是否必填
  - `default` (string) 默认值
- `select` (object) 下拉控件
  - `label` (string) 控件展示标签名
  - `variable` (string) 控件 ID
  - `required` (bool) 是否必填
  - `default` (string) 默认值
  - `options` (array[string]) 选项值

**file_upload 结构：**
- `image` (object) 图片设置（当前仅支持图片类型：png, jpg, jpeg, webp, gif）
  - `enabled` (bool) 是否开启
  - `number_limits` (int) 图片数量限制，默认 3
  - `transfer_methods` (array[string]) 传递方式列表，remote_url, local_file，必选一个

**system_parameters 结构：**
- `file_size_limit` (int) 文档上传大小限制 (MB)
- `image_file_size_limit` (int) 图片文件上传大小限制（MB）
- `audio_file_size_limit` (int) 音频文件上传大小限制 (MB)
- `video_file_size_limit` (int) 视频文件上传大小限制 (MB)

#### 请求示例

```bash
curl -X GET 'http://aie.wenge.com:30051/v1/parameters' \
  --header 'Authorization: Bearer {api_key}'
```

#### 响应示例

```json
{
  "introduction": "nice to meet you",
  "user_input_form": [
    {
      "text-input": {
        "label": "a",
        "variable": "a",
        "required": true,
        "max_length": 48,
        "default": ""
      }
    }
  ],
  "file_upload": {
    "image": {
      "enabled": true,
      "number_limits": 3,
      "transfer_methods": [
        "remote_url",
        "local_file"
      ]
    }
  },
  "system_parameters": {
    "file_size_limit": 15,
    "image_file_size_limit": 10,
    "audio_file_size_limit": 50,
    "video_file_size_limit": 100
  }
}
```

---

### 获取应用Meta信息

用于获取工具icon。

**Endpoint:** `GET /meta`

#### 查询参数

| 参数名 | 类型 | 说明 |
|--------|------|------|
| user | string | 用户标识，由开发者定义规则，需保证用户标识在应用内唯一 |

#### 响应

- `tool_icons` (object[string]) 工具图标
  - 工具名称 (string) → `icon` (object|string)
    - (object) 图标
      - `background` (string) hex格式的背景色
      - `content` (string) emoji
    - (string) 图标URL

#### 请求示例

```bash
curl -X GET 'http://aie.wenge.com:30051/v1/meta?user=abc-123' \
  -H 'Authorization: Bearer {api_key}'
```

#### 响应示例

```json
{
  "tool_icons": {
    "dalle2": "https://cloud.dify.ai/console/api/workspaces/current/tool-provider/builtin/dalle/icon",
    "api_tool": {
      "background": "#252525",
      "content": "😁"
    }
  }
}
```
