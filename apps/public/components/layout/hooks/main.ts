import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {isLoadingState, projectsState, teamsState} from "@clover/public/state/public";
import {useCallback, useEffect} from "react";
import {profile} from "@clover/public/rest/auth";
import {accessState} from "@easy-kit/common/state/access";
import { my as myTeams } from "@clover/public/rest/team";
import { my as myProjects } from "@clover/public/rest/project";
import {useRouter} from "next/navigation";
import bus from "@easy-kit/common/events";
import {UNAUTHORIZED} from "@clover/public/events/auth";
import localforage from "localforage";
import {SIDEBAR_OPEN_KEY} from "@clover/public/components/layout/main/const";
import {sidebarOpenState} from "@clover/public/components/layout/main/state";

export const useCurrent = () => {
    const account = useRecoilValue(accountInfoState);
    return {
        teamId: account?.currentTeamId,
        projectId: account?.currentProjectId
    }
}
