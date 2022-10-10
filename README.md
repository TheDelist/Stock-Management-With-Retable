
# Stock Management with Retable

Backend Stock management system API written in Node.js(TS) and Retable.


## API Reference

#### Create Product

```http
  POST /v1/api/product
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. string of product to create |
| `description`      | `string` |  description of product to create |
| `price`      | `string` | **Required**. price of product to create |
| `amount`      | `number` |**Required**. amount of product to create |


#### Get all items

```http
  GET /v1/api/product
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `none` | none |

#### Get item

```http
  GET /v1/api/product/${productid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productid`      | `number` | **Required**. Id of product to fetch |

#### GET All Columns

```http
  GET /v1/api/columns
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `none`      | `none` | none |


#### Update Product

```http
  PUT /v1/api/product/${productid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productid`      | `number` | **Required**. Id of product to update |
| `name`      | `string` |  string of product to update |
| `description`      | `string` |  description of product to update |
| `price`      | `string` |  price of product to update |
| `amount`      | `number` | amount of product to update |

#### Delete Product

```http
  DELETE /v1/api/product/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productIds`      | `number Array` | **Required**. Ids of product to Delete |



