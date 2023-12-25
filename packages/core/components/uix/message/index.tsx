import { useToast } from "@atom-ui/core/components/ui/use-toast"

export const useMessage = () => {
    const { toast } = useToast();
    return {
        success: (message?: string) => {
            toast({
                description: message,
            })
        },
        error: (message?: string) => {
            toast({
                variant: "destructive",
                description: message,
            })
        }
    }
};