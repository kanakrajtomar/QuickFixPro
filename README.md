## Docs

## Stack and extensions used

|          Usecase           |             Name           |
| -------------------------- | -------------------------- |
|         Framework          |            Next JS         |
|       To fetch API         |             Axios          |
|            UI              |            Shadcn          |
|          Icons             |    Remix Icons, Flaticon   |
|     State Management       | Redux Toolkit, React Redux |

## Components

Everything is in → ```components``` folder.

## Apis

Find all the apis in ```lib``` → ```apis.ts``` file.

|          Usecase           |                Function                |
| -------------------------- | -------------------------------------- |
|    Get Root Categories     |        ```fetchCategories()```         |
|                            | -------------------------------------- |
|                            | ```fetchCategories``` from ```slice``` |
| -------------------------- | -------------------------------------- |
|   Get the Offer Carousel   |    ```fetchHeroCarouselElements()```   |
| -------------------------- | -------------------------------------- |


**Note:** To write moduluar **api** calls:

Create this structure: ```lib``` → ```api``` → ```<API_NAME>.ts``` (Hasn't been implemented yet.)
**Tip:** Better create a modular ```slice``` for them.