import { useToast } from "@clover/core/components/ui/use-toast"

const useMessage = () => {
    const { toast } = useToast();
    return {
        success: (message: string) => {
            toast({
                description: message,
            })
        },
        error: (message: string) => {
            toast({
                variant: "destructive",
                description: message,
            })
        }
    }
};

export default useMessage;
