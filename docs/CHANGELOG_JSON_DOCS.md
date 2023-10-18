# Changelog JSON Documentation

The structure of the Changelog JSON has documented to provide a clear representation of the last 5 updates shown when clicked at Chnagelog on [yungsamd17.github.io/np-carmods](https://yungsamd17.github.io/np-carmods/). Below is a detailed breakdown of the key components:

- [1. Changelog Entry](#1-changelog-entry)
  - [1.2. Normal Singe Entry](#12-normal-single-entry)
  - [1.3. Multiple Changes in a Single Entry](#13-multiple-changes-in-a-single-entry)

## 1. Changelog Entry:

### 1.2. Normal Singe Entry:

Each entry in the Changelog JSON represents a set of changes made on a specific date.

- **Key:** `"date"`
  - **Value Type:** String (Format: "DD/MM/YYYY")
  - **Example:**
    ```json
    "date": "18/10/2023"
    ```
  - **Usage:** Specifies the date of the changelog entry.

- **Key:** `"changelog"`
  - **Value Type:** Array of Objects
  - **Sub-Keys:**
    - `"change"`: Describes a specific change made.
  - **Example:**
    ```json
    "changelog": [
        {"change": "Updated 'Vehicle Sound Mods' mod names"}
    ]
    ```
  - **Usage:** Lists the changes made on the specified date.

### 1.3. Multiple Changes in a Single Entry:

You can include multiple changes within a single entry by providing an array of change objects.

```json
{
    "date": "23/06/2023",
    "changelog": [
        {"change": "Added Valkyrie"},
        {"change": "Added '22 Countach"},
        {"change": "Added '12 Escalade"}
    ]
}
