import { useSearchParams } from "react-router-dom"

type QueryParams = {
  component?: string
  template?: string
}

type UseQueryParamsReturnType = {
  queryParams: QueryParams
  setQueryParams: (queryParams?: QueryParams) => void
}

export function useQueryParams(): UseQueryParamsReturnType {
  const [queryParams, setQueryParams] = useSearchParams()

  return {
    queryParams: {
      component: queryParams?.get("component") ?? undefined,
      template: queryParams?.get("template") ?? undefined,
    },
    setQueryParams,
  }
}
