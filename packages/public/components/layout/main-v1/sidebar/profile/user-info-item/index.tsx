import {useProfile} from "@clover/public/hooks";

export const UserInfoItem = () => {
    const profile = useProfile();
    return <div className={"space-y-1 min-w-32"}>
        <div className={"font-medium text-lg"}>{profile.username}</div>
        <div className={"text-secondary-foreground/50"}>{profile.email}</div>
    </div>
}
