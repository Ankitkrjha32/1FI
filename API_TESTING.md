# API Testing Guide

## Test API Endpoints with PowerShell

### 1. Health Check

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```

Expected Response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 2. Get All Products

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method Get
```

### 3. Get Single Product by Slug

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/products/apple-iphone-15-pro" -Method Get
```

---

## Test with cURL (if installed)

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Get Product by Slug
```bash
curl http://localhost:5000/api/products/apple-iphone-15-pro
```

---

## Test with Postman

### Import Collection

1. Open Postman
2. Click "Import"
3. Create new collection "EMI Products API"

### Create Requests

#### 1. Health Check
- Method: `GET`
- URL: `http://localhost:5000/api/health`

#### 2. Get All Products
- Method: `GET`
- URL: `http://localhost:5000/api/products`

#### 3. Get Product by Slug
- Method: `GET`
- URL: `http://localhost:5000/api/products/{{slug}}`
- Variable: slug = apple-iphone-15-pro

#### 4. Create Product
- Method: `POST`
- URL: `http://localhost:5000/api/products`
- Body: form-data
  - name: Apple iPhone 15 Pro
  - slug: apple-iphone-15-pro
  - brand: Apple
  - category: smartphones
  - description: Premium smartphone
  - ram: 8GB
  - storage: 256GB
  - mrp: 139900
  - price: 129900
  - image: [Upload file]
  - variants: [{"name":"Natural Titanium","type":"color","value":"#8B7355"}]
  - emiPlans: [{"monthlyPayment":10825,"tenure":12,"interestRate":0,"totalAmount":129900}]

#### 5. Delete Product
- Method: `DELETE`
- URL: `http://localhost:5000/api/products/{{productId}}`

---

## Response Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Sample Responses

### Success Response
```json
{
  "success": true,
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```
