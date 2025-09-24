import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TransciptMessage {
    role: "user" | "assistant";
    text: string;
};

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TransciptMessage[]>([]);

    useEffect(() => {
        // only for testing the vapi api, otherwise customers will provide their own api keys
        const vapiInstance = new Vapi("1e7a4d0e-ac0d-4c7e-8e75-23abf1fc84fe");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscript([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        });

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        });

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                ...prev,
                {
                    role: message.role === "user" ? "user" : "assistant",
                    text: message.transcript,
                },
                ]);
            }

           // setTranscript([]);
        });

        return () => {
            vapiInstance?.stop();
        }
  }, []);

  const startCall = () => {
    setIsConnecting(true);

    if (vapi) {
        //only for testing -the key
      vapi.start("cf8eece9-f86e-4489-af05-e0dc1771d6a7");
    }
    
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
    startCall,
    endCall,
  };
    
};