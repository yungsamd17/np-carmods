# Carmods JSON Documentation

The structure of the Car Mods JSON has documented to provide a clear representation on flexibility and features. Below is a detailed breakdown of the key components:

- [1. Mod Entry](#1-mod-entry)
  - [1.2. Normal Mod Entry](#12-normal-mod-entry)
  - [1.3. Mod Entries with Multiple Links](#13-mod-entries-with-multiple-links)
  - [1.4. Mod Entries without the Need for "link" (e.g., "NoPixel Exclusive" Mods)](#14-mod-entries-without-the-need-for-link-eg-nopixel-exclusive-mods)
  - [1.5. Manually Set "Delimiter" for Links _(Optional)_](#15-manually-set-delimiter-for-links-optional)
- [2. Category Header Level](#2-category-header-level)
- [3. Category Header Link _(Optional)_](#3-category-header-link-optional)
  - [3.2. Opening Links in New Tab _(Optional)_](#32-opening-links-in-new-tab-optional)


## 1. Mod Entry:

### 1.2. Normal Mod Entry:

```json
{"name": "Nissan GTR R35", "link": "https://www.gta5-mods.com/vehicles/nissan-gtr-r35-varis-wald-c-west-topsecret"}
```

### 1.3. Mod Entries with Multiple Links:

```json
{
    "links": [
        {"text": "Nissan Skyline GTR R34", "url": "https://www.gta5-mods.com/vehicles/nissan-skyline-gt-r-bnr34-yca-y97y"},
        {"text": "Tail lights", "url": "https://www.gta5-mods.com/paintjobs/tail-lights-for-nissan-skyline-gt-r-bnr34"}
    ]
}
```

### 1.4. Mod Entries without the Need for "link" (e.g., "NoPixel Exclusive" Mods):

```json
{"name": "Rolls-Royce Cullinan (NoPixel Exclusive)"}
```

### 1.5. Manually Set "Delimiter" for Links _(Optional)_:

```json
{
    "links": [
        {"text": "Nissan Skyline GTR R34", "url": "https://www.gta5-mods.com/vehicles/nissan-skyline-gt-r-bnr34-yca-y97y"},
        {"text": "Tail lights", "url": "https://www.gta5-mods.com/paintjobs/tail-lights-for-nissan-skyline-gt-r-bnr34"}
    ],
    "delimiter": " / "
}
```

> [!NOTE]  
> If you don't set "delimiter", it will automaticly apply default + delimiter.


## 2. Category Header Level:

The `"headerLevel"` key is **required**. If not present, the category name will be just normal text entry above all the mods.

- **Key:** `"headerLevel"`
- **Value Type:** Integer
- **Example:**
  ```json
  "headerLevel": 2
  ```
- **Usage:** Specifies the header level for the category in HTML. For example, 2 corresponds to `<h2>`.


## 3. Category Header Link _(Optional)_:

The `"headerLink"` key is optional. If not present, the category header will behave as before, without an associated link.

- **Key:** `"headerLink"`
- **Value Type:** Object
- **Sub-Keys:**
  - `"url"`: The URL to be associated with the category header.
  - `"openInNewTab"`: _(Optional)_ A boolean flag indicating whether the header link should open in a new tab. Default is `false`.
- **Example:**
  ```json
  "headerLink": {
      "url": "https://www.gta5-mods.com/users/GTAWiseGuy",
      "openInNewTab": true
  }
  ```

### 3.2. Opening Links in New Tab _(Optional)_:

- **Key:** `"openInNewTab"`
- **Value Type:** Boolean
- **Example:**
  ```json
  "openInNewTab": true
  ```
- **Usage:** Applicable to header link. If set to true, the link will open in a new tab.
  - By **default** if `"openInNewTab"` is not set, and header has link it just go to link and not open it in new tab.
