"use client";

//import { WidgetFooter } from "../components/widget-footer";
//import { WidgetHeader } from "../components/widget-header";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";

import { useAtomValue } from "jotai";
import { screenAtom } from "@/modules/widget/atoms/widget-atoms";
import { WidgetErrorScreen } from "../screens/widget-error-screen";
import { WidgetLoadingScreen } from "../screens/widget-loading-screen";
/*";


import { WidgetSelectionScreen } from "../screens/widget-selection-screen";
import { WidgetChatScreen } from "../screens/widget-chat-screen";
import { WidgetInboxScreen } from "../screens/widget-inbox-screen";
import { WidgetVoiceScreen } from "../screens/widget-voice-screen";
import { WidgetContactScreen } from "../screens/widget-contact-screen";
 */
interface Props{
    organizationId: string | null ;
};

export const WidgetView = ({organizationId}: Props) => {
    const screen = useAtomValue(screenAtom);

    const screenComponents = {
        error: <WidgetErrorScreen />,
        loading:<WidgetLoadingScreen organizationId={organizationId}/>,
        auth:<WidgetAuthScreen/>,
        voice: <p>TODO: Voice</p>,//<WidgetVoiceScreen />,
        inbox: <p>TODO: Inbox</p>,//<WidgetInboxScreen />,
        selection: <p>TODO: Selection</p>,//<WidgetSelectionScreen />,
        chat: <p>TODO: Chat</p>,//<WidgetChatScreen />,
        contact:<p>TODO: Contact</p>, //<WidgetContactScreen />,
    } 

    return (
        // todo :  confirm if min-h-screen is need
        <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
            {screenComponents[screen]}
        </main>
    );
};