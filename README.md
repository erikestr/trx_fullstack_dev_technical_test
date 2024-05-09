# Technical Test for Fullstack Developer Position

## Infrastructure
This project was developed by Erik Estrada for the technical test of the Fullstack Developer position at Traxion, using the following technologies:

- **Frontend**: Develop on React.js.
    - **Arch**: Atomic Design.
    - **Packages used**: 
        - **@vis.gl/react-google-maps**: For Google Maps.
        - **React-Router-Dom**: For Routing.
        - **TailwindCss**: For styling.

    - **Functionality**:
        - **Tracking**: Show the route of a vehicle in a Google Map.
        - **Map Geojson**: Load a Geojson file to show the route.
        - **Create Vehicle**: Form to create a new vehicle.
        - **Vehicle Details**: Shows the details of a vehicle.
        - **Vehicle List**: Shows a list of all vehicles using server side pagination.
        - **Search**: To search for vehicles on the list.
        - **Web Socket Client**: To receive real-time updates.
- **Backend**: Develop on Node.js.
    - **Packages used**:
        - **Express**: To create the server.
        - **Firebase-admin**: For connection to Firebase.
        - **WebSocket**: For real-time communication.
        - **Cors**: For Cross-Origin Resource Sharing.
        - **Dotenv**: To load environment variables.
        - 
    - **Functionality**:
        - **Api Routes**: Serve access to data related to Routes.
        - **Api Vehicles**: Serve access to data related to Vehicles.
        - **Web Socket Server**: Listens for changes and sends them to the client.
        - **SSL**: SSS was eneabled for secure connection.

  - **Database**: Deployed on Firebase.

## Design
Design inpirated by this Dibble work:

![Design](https://cdn.dribbble.com/userupload/3276004/file/original-fdd63dc03fba6a396c396a651a066463.png?resize=1024x768&vertical=center)

# Results

### Vercel
Frontend deployed on Vercel at the following link:

[<style>.centered{display:flex; align-items: center;}img{background-color: #fff; padding: 1rem; border-radius:1rem;}</style><div class="centered"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/2560px-Vercel_logo_black.svg.png" width="128"/></div>](https://trx-dev-technical.vercel.app)


### API & Web Socket
Backend was mounted on Google Cloud Platform. The domain was changed and SSL was added for secure connection.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/19250359-79111938-4715-4640-93db-29494901404d?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D19250359-79111938-4715-4640-93db-29494901404d%26entityType%3Dcollection%26workspaceId%3D0841470f-5b91-4a7a-8df7-390cb5491029)
