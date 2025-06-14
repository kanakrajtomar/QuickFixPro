<h2>QuickService – Frontend Platform</h2><br>
QuickService is the frontend part of a modern quick-repair platform, similar to how Blinkit operates in the quick-commerce space. This application is designed for rapid on-demand services like AC repair, electrical appliance troubleshooting, and more.

If there's a problem in your AC or any electrical appliance, this platform helps you connect to a quick service technician available 24/7. Users can track technician location, select services, and book repairs instantly – all through an intuitive and seamless UI.


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
