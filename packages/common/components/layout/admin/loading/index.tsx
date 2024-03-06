import { NavigationEvents } from "@easy-kit/common/components/navigation-events";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@easy-kit/common/components/layout/admin/state";

export const AdminLayoutLoading = () => {
    const setLoading = useSetRecoilState(loadingState);

    return <NavigationEvents
        start={() => setLoading(true)}
        done={() => setLoading(false)}
    />;
}
