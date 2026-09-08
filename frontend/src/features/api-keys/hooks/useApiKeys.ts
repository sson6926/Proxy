import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiKeysApi } from '../api/apiKeys.api'
import { CreateApiKeyRequest } from '../types/apiKeys.types'

export function useApiKeys() {
  return useQuery({
    queryKey: ['apiKeys'],
    queryFn: apiKeysApi.getApiKeys,
  })
}

export function useCreateApiKey() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateApiKeyRequest) => apiKeysApi.createApiKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] })
    },
  })
}

export function useDeleteApiKey() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => apiKeysApi.deleteApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] })
    },
  })
}

export function useRegenerateApiKey() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: string) => apiKeysApi.regenerateApiKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys'] })
    },
  })
}
