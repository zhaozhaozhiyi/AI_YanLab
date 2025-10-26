/**
 * Netlify Function: API Proxy
 * 代理 HTTP API 请求，避免 Mixed Content 错误
 * 在 HTTPS 页面上代理到 HTTP API 服务器
 */

exports.handler = async (event, context) => {
  // 允许的 HTTP 方法
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  
  // 处理 OPTIONS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }
  
  // 检查方法是否允许
  if (!allowedMethods.includes(event.httpMethod)) {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  // 获取请求信息
  const method = event.httpMethod;
  const path = event.path.replace('/.netlify/functions/api-proxy', ''); // 移除函数路径
  const headers = event.headers;
  const body = event.body;
  
  // API 配置
  const API_BASE = 'http://aie.wenge.com:30051';
  const API_KEY = 'app-7GvRPyu0pd3wzK7YDWF6byue';
  
  // 构建目标 URL
  const queryString = event.queryStringParameters 
    ? '?' + new URLSearchParams(event.queryStringParameters).toString()
    : '';
  const targetUrl = `${API_BASE}${path}${queryString}`;
  
  console.log('Proxying request to:', targetUrl);
  
  // 准备请求选项
  const fetchOptions = {
    method: method,
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': headers['content-type'] || 'application/json',
      'User-Agent': 'Netlify-Proxy'
    }
  };
  
  // 添加请求体（如果有）
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    fetchOptions.body = body;
  }
  
  try {
    // 发送请求到 API 服务器
    const response = await fetch(targetUrl, fetchOptions);
    
    // 获取响应头
    const contentType = response.headers.get('content-type');
    const responseHeaders = {
      'Content-Type': contentType || 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    };
    
    // 获取响应内容
    let responseBody;
    
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }
    
    // 返回响应
    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody)
    };
    
  } catch (error) {
    console.error('API Proxy Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};

