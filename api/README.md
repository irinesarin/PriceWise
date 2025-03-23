# PriceWise API

This is the backend API for PriceWise, a price comparison application that fetches real-time data from Amazon and Flipkart.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your API keys:
```env
RAPIDAPI_KEY=your_rapidapi_key
FLIPKART_AFFILIATE_ID=your_flipkart_affiliate_id
FLIPKART_AFFILIATE_TOKEN=your_flipkart_affiliate_token
```

3. Run the API:
```bash
python main.py
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### GET /api/search/{query}
Search for products on Amazon and Flipkart.

Example:
```bash
curl http://localhost:8000/api/search/nike%20shoes
```

Response:
```json
[
  {
    "title": "Nike Running Shoes",
    "price": 4999.0,
    "image_url": "https://...",
    "product_url": "https://...",
    "source": "amazon"
  },
  {
    "title": "Nike Sports Shoes",
    "price": 4499.0,
    "image_url": "https://...",
    "product_url": "https://...",
    "source": "flipkart"
  }
]
```
