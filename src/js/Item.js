const itemList = [];
const staticItemList = []; // Initialize static item list

class itemData {
    constructor(item_id, name, width, height, image = "", layer = 3) {
        this.item_id = item_id;
        this.name = name;
        this.width = width;
        this.height = height;
        this.image = image;
        this.layer = layer;
    }
}

class Item {
    constructor(item_id, spawnX = 100, spawnY = 100) {
        this.item_id = item_id;
        this.name = staticItemList[item_id].name;
        this.itemSprite = new Sprite(spawnX, spawnY, staticItemList[item_id].width, staticItemList[item_id].height);
        this.itemSprite.layer = staticItemList[item_id].layer;
        if (staticItemList[item_id].image !== "") this.itemSprite.img = staticItemList[item_id].image;
    }
}

function spawnItem(num) {
    let temp = new Item(num);
    itemList.push(temp);
}

function spawnItemAt(num, x, y) {
    let temp = new Item(num, x, y);
    itemList.push(temp);
}

function removeItem() {
    if (itemList.length > 0) {
        itemList[itemList.length - 1].itemSprite.remove();
        itemList.pop();
    }
}

function handleKeyPress(event) {
    if (event.key === 'i' || event.key === 'I') {
        spawnItem(0); // Change the number to spawn different items
    }
}

function itemHandler() {
    for (let i = 0; i < itemList.length; i++) {
        let currentItem = itemList[i];
        
        // Check for collisions with other objects (e.g., player, enemies, walls)
        // Replace 'otherObject' with the object you want to check collision with
        if (currentItem.itemSprite.collide(otherObject)) {
            // Remove the item's sprite from the game world
            currentItem.itemSprite.remove();
            
            // Remove the item from the itemList array
            itemList.splice(i, 1);
            
            // Decrease index after removing an item
            i--;
        }
    }            
}

function setupStaticItemList() {
    // Add new items here
    let temp = new itemData(0, "key", 50, 50, "key.png", 3);
    staticItemList.push(temp);

    temp = new itemData(1, "Flashlight", 30, 30, "Flashlight.png", 3);
    staticItemList.push(temp);

    // Check if item IDs are sequential
    for (let i = 0; i < staticItemList.length; ++i) {
        if (i != staticItemList[i].item_id) {
            console.log("Item id issue at", i);
            throw new Error("Item ids are not sequential or numbers are shared when they should not");
        }
    }
}

// Add event listener for keyboard input
document.addEventListener('keydown', handleKeyPress);

