# LRU Cache Implementation

This is an implementation of a Least Recently Used (LRU) Cache in JavaScript using Doubly Circular Linked List (CDLL) for efficient management of cache data. The cache stores a limited number of key-value pairs and evicts the least recently used item when it reaches its capacity.

## Features
- **Fast Operations:** O(1) time complexity for `get()` and `put()` operations.
- **Automatic Eviction:** Removes the least recently used (LRU) item when the cache exceeds its capacity.
- **UI Display:** Updates the cache UI dynamically as items are added or accessed.

## Installation
Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/lru-cache.git
```
Navigate to the project folder:
```bash
cd lru-cache
```
Open the `index.html` file in a browser to view the cache UI in action.

## Usage

### **Code Preview**
```javascript
let cacheSize = Number(prompt("Enter CacheSize?"));
if (cacheSize > 0) {
  LRU = new LRUCache(cacheSize);
}

function put() {
  if (!LRU) return alert("Initialize cache first!");
  let key = Number(document.querySelector("#key").value);
  let value = Number(document.querySelector("#value").value);
  if (!isNaN(key) && !isNaN(value)) {
    LRU.put(key, value);
  }
}

function get() {
  if (!LRU) return alert("Initialize cache first!");
  let key = Number(document.querySelector("#toGet").value);
  let val = LRU.get(key);
  if (val !== -1) {
    document.querySelector("#keyValue").innerText = 
      `Key(${key})  => value ${val}`;
  } else {
    document.querySelector("#keyValue").innerText = "Key Not Found!";
  }
}
```

## How It Works
### **Cache Initialization**
- The cache is initialized with a specified size.
- Once full, any new `put()` operation will evict the least recently used item.

### **Adding Items**
- The `put(key, value)` method adds key-value pairs.
- If the key already exists, the value updates, and the key moves to the front of the cache.

### **Retrieving Items**
- The `get(key)` method fetches the value for the key (if it exists).
- The accessed key moves to the front, marking it as recently used.

## UI Display
- **Cache List:** Displays current key-value pairs, ordered by recent use.
- **Dynamic Updates:** UI updates in real time as items are added or accessed.

## Applications
- **Web Caching:** Store frequently accessed web pages for faster load times.
- **Database Query Optimization:** Cache query results to reduce redundant computations.
- **Memory Management:** Used in operating systems to manage limited memory resources.

## License
This project is licensed under the **MIT License** – feel free to use and modify it.

## Contributing
- Fork the repository, make changes, and submit a pull request.
- Issues and improvements are welcome!
