# Bee Murdering Game

A simple game to show how OOP works in JavaScript.

### Version

1.0.0

---

![Screenshot](readme/screenshot.png?raw=true)

## Code Discussion

A bee object is instantiated like this:

```
var Bee = function(id, lifespan, hitDeduction, type) {
    this.id = id;
    this.lifespan = lifespan;
    this.hitDeduction = hitDeduction;
    this.type = type;
}
```

Methods are added to the object with prototyping:

```
Bee.prototype.amIDead = function() {
    return this.lifespan <= 0;
};
```

## Resources

### Libraries Used

* jQuery

