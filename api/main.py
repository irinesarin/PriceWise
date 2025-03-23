from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
from typing import List, Dict, Any

app = Flask(__name__)

# Load environment variables
load_dotenv()

def search_amazon(query: str) -> List[Dict[str, Any]]:
    url = "https://amazon-online-data-api.p.rapidapi.com/search"
    headers = {
        "x-rapidapi-key": os.getenv("RAPIDAPI_KEY", "7e9f13ae68msh6c94af49826ab6fp1d2e13jsn0695ba50ed9c"),
        "x-rapidapi-host": "amazon-online-data-api.p.rapidapi.com"
    }
    params = {
        "query": query,
        "page": "1",
        "geo": "IN"
    }
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        return []
        
    data = response.json()
    products = []
    
    for item in data.get("products", [])[:5]:
        try:
            price = float(item.get("product_original_price", "0").replace("₹", "").replace(",", ""))
            products.append({
                "title": item.get("product_title", ""),
                "price": price,
                "image_url": item.get("product_photo", ""),
                "product_url": item.get("product_url", ""),
                "source": "amazon"
            })
        except (ValueError, AttributeError):
            continue
            
    return products

def search_flipkart(query: str) -> List[Dict[str, Any]]:

    affiliate_id = "davisdbli"
    affiliate_token = "8610912bba0e49c6b934e1baccc7e6df"
    url = "https://affiliate-api.flipkart.net/affiliate/1.0/search.json"
    
    headers = {
        "Fk-Affiliate-Id": affiliate_id,
        "Fk-Affiliate-Token": affiliate_token
    }

    # Define request parameters
    params = {
        "query": query,
        "resultCount": 5
    }
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        return []
        
    data = response.json()
    products = []
    
    for item in data.get("products", []):
        product_info = item.get("productBaseInfoV1", {})
        print(product_info.get("imageUrls", {}).get("200x200", "").replace("200", "2112"))
        products.append({
            "title": product_info.get("title", ""),
            "price": product_info.get("flipkartSellingPrice", {}).get("amount", 0.0),
            "image_url": product_info.get("imageUrls", {}).get("200x200", "").replace("200", "2112"),
            "product_url": product_info.get("productUrl", ""),
            "source": "flipkart"
        })
            
    return products

@app.route("/api/search/<query>")
def search_products(query: str):
    try:
        # Search on Amazon
        amazon_results = search_amazon(query)
        
        # Search on Flipkart
        flipkart_results = search_flipkart(query)
        
        # Combine results
        results = amazon_results + flipkart_results
        
        # Enable CORS
        response = jsonify(results)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
