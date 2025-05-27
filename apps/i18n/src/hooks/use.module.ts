import { useParams } from "next/navigation";

export const useModule = () => {
  const { module } = useParams<Record<string, string>>();
  return module
}
