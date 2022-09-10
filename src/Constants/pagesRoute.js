import "./pagesPath";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import NotFoundPage from "../Pages/ErrorPages/404";
import TarrifPage from "../Pages/TarrifPage/TarrifPage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import GalleryPage from "../Pages/GalleryPage/Gallery"
import { contactPath, galleryPath, homePath, loginPath, notFoundPath, tarrifPath } from "./pagesPath";

const appRoutesList = 
[
    {
        path: homePath,
        component: HomePage,
        children: [],
    },
    {
        path: tarrifPath,
        component: TarrifPage,
        children: [],
    },
    {
        path: contactPath,
        component: ContactPage,
        children: [],
    },
    {
        path: galleryPath,
        component: GalleryPage,
        children: [],
    },
    {
        path: galleryPath,
        component: GalleryPage,
        children: [
            {
                path: '/:folderId',
                component: HomePage,
                children: [
                     {
                        path: '/albumId',
                        component: HomePage,
                        children: [
                            {
                                path: '/:photoId',
                                component: HomePage,
                                children: [],
                            }
                        ],
                     }
                ],
            }
        ],
    },
    {
        path: '/dashboar',
        component: HomePage,
        children: [],
    },
    {
        path: loginPath,
        component: LoginPage,
        children: [],
    },
    {
        path: notFoundPath,
        component: NotFoundPage,
        children: [],
    },
];

export default appRoutesList;