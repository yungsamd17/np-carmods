# JSON Mod entry _"Formating"_


Normal Mod entry example:

```
{"name": "Nissan GTR R35", "link": "https://www.gta5-mods.com/vehicles/nissan-gtr-r35-varis-wald-c-west-topsecret"}
```

Mod entries with multiple Links example:

```
{
    "links": [
        {"text": "Nissan Skyline GTR R34", "url": "https://www.gta5-mods.com/vehicles/nissan-skyline-gt-r-bnr34-yca-y97y"},
        {"text": "Tail lights", "url": "https://www.gta5-mods.com/paintjobs/tail-lights-for-nissan-skyline-gt-r-bnr34"}
    ]
}
```

You can also add a Mod entries without the need for `"link"` _(For Example: "NoPixel Exclusive" mods)_`

_**Optionaly:**_

You can add manualy set **"delimiter"** to whatever you want between links.

> [!NOTE]  
> If you don't set "delimiter", it will automaticly apply default + delimiter.

Example:

```
{
    "links": [
        {"text": "Nissan Skyline GTR R34", "url": "https://www.gta5-mods.com/vehicles/nissan-skyline-gt-r-bnr34-yca-y97y"},
        {"text": "Tail lights", "url": "https://www.gta5-mods.com/paintjobs/tail-lights-for-nissan-skyline-gt-r-bnr34"}
    ],
    "delimiter": " / "
}
```

