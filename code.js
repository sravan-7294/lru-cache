class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class CDLL {
  constructor() {
    this.head = null;
  }

  insertionAtBegin(key, value) {
    let nn = new Node(key, value);
    nn.next = nn.prev = nn;
    if (!this.head) {
      this.head = nn;
      return nn;
    }
    let last = this.head.prev;
    nn.next = this.head;
    this.head.prev = nn;
    last.next = nn;
    nn.prev = last;
    this.head = nn;
    return nn;
  }

  deletionAtEnd(map) {
    if (!this.head) return;
    let last = this.head.prev;
    if (this.head === last) {
      map.delete(this.head.key);
      this.head = null;
      return;
    }
    last = last.prev;
    map.delete(last.next.key);
    last.next = this.head;
    this.head.prev = last;
  }

  bringToFront(curr) {
    if (this.head.key === curr.key) return;
    let prv = curr.prev;
    let nxt = curr.next;
    if (prv === nxt) {
      this.head = curr;
      return;
    }
    prv.next = nxt;
    nxt.prev = prv;
    let last = this.head.prev;
    this.head.prev = curr;
    curr.next = this.head;
    curr.prev = last;
    last.next = curr;
    this.head = curr;
  }
}

class LRUCache {
  constructor(k) {
    this.size = k;
    this.obj = new CDLL();
    this.m = new Map();
  }

  get(key) {
    if (this.m.has(key)) {
      let node = this.m.get(key);
      this.obj.bringToFront(node);
      this.updateCacheUI();
      return node.value;
    }
    return -1;
  }

  put(key, value) {
    if (this.m.has(key)) {
      this.obj.bringToFront(this.m.get(key));
      this.m.get(key).value = value;
    } else {
      if (this.size !== 0) {
        let n = this.obj.insertionAtBegin(key, value);
        this.m.set(key, n);
        this.size--;
      } else {
        this.obj.deletionAtEnd(this.m);
        let n = this.obj.insertionAtBegin(key, value);
        this.m.set(key, n);
      }
    }
    this.updateCacheUI();
  }
  updateCacheUI() {
    let list = document.querySelector("#list");
    list.innerHTML = "";

    if (!this.obj.head) {
      list.innerHTML = "<p>Cache is empty</p>";
      return;
    }

    let temp = this.obj.head;
    let firstDiv = document.createElement("div");
    firstDiv.className = "box";
    firstDiv.innerText = ` ${temp.key}, ${temp.value} `;
    let firstItem = document.createElement("li");
    firstItem.appendChild(firstDiv);
    list.appendChild(firstItem);
    temp = temp.next;

    while (temp !== this.obj.head) {
      // Arrow
      let arrowDiv = document.createElement("div");
      arrowDiv.innerHTML = "&#8594;";
      let arrowItem = document.createElement("li");
      arrowItem.appendChild(arrowDiv);
      list.appendChild(arrowItem);
      //Node
      let dataDiv = document.createElement("div");
      dataDiv.className = "box";
      dataDiv.innerText = ` ${temp.key}, ${temp.value} `;
      let dataItem = document.createElement("li");
      dataItem.appendChild(dataDiv);
      list.appendChild(dataItem);
      temp = temp.next;
    }
  }
}

let LRU;
let cacheSize = Number(prompt("Enter CacheSize?"));
if (cacheSize > 0) {
  LRU = new LRUCache(cacheSize);
}
function put() {
  if (!LRU) return alert("Initialize cache first! Refresh the page.");
  document.querySelector("#toGet").value = "";
  document.querySelector("#keyValue").innerText = "";
  let key = Number(document.querySelector("#key").value);
  let value = Number(document.querySelector("#value").value);
  if (!isNaN(key) && !isNaN(value)) {
    LRU.put(key, value);
    document.querySelector("#key").value = "";
    document.querySelector("#value").value = "";
  }
}

function get() {
  if (!LRU) return alert("Initialize cache first! Refresh the page.");
  let inp = document.querySelector("#toGet").value;
  let key = Number(inp);
  if (!isNaN(key)) {
    let val = LRU.get(key);
    document.querySelector("#keyValue").innerText =
      val !== -1 ? `Key(${key})  => value ${val}` : "Key Not Found!";
  }
}
