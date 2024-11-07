import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root.tsx";
import ErrorPage from "./error-page.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChannelsPage from "./pages/ChannelsPage.tsx";
import ChatRoomPage from "./pages/ChatRoomPage.tsx";
import DMChatPage from "./pages/DMChatPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/channels",
        element: <ChannelsPage />,
      },
      {
        path: "/chatroom/:channelId",
        element: <ChatRoomPage />,
      },
      {
        path: "/dm",
        element: <DMChatPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
