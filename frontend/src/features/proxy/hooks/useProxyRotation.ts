import { useState } from 'react'

export interface ProxyRotationSettings {
  strategy: 'random' | 'round-robin' | 'latency-based' | 'geographic'
  refreshInterval: number
  maxRetries: number
  healthCheckEnabled: boolean
  autoSwitch: boolean
}

export function useProxyRotation() {
  const [settings, setSettings] = useState<ProxyRotationSettings>({
    strategy: 'random',
    refreshInterval: 300, // 5 minutes
    maxRetries: 3,
    healthCheckEnabled: true,
    autoSwitch: true,
  })

  const [currentProxy, setCurrentProxy] = useState<string | null>(null)
  const [proxyPool, setProxyPool] = useState<string[]>([])
  const [rotationHistory, setRotationHistory] = useState<Array<{ time: string; proxy: string; reason: string }>>([])

  const rotateProxy = (reason: string = 'manual rotation') => {
    if (proxyPool.length === 0) {
      console.warn('No proxies in pool')
      return null
    }

    let nextProxy: string

    switch (settings.strategy) {
      case 'random':
        nextProxy = proxyPool[Math.floor(Math.random() * proxyPool.length)]
        break
      case 'round-robin':
        const currentIndex = proxyPool.indexOf(currentProxy || '')
        nextProxy = proxyPool[(currentIndex + 1) % proxyPool.length]
        break
      case 'latency-based':
        // In production, would measure latencies
        nextProxy = proxyPool[Math.floor(Math.random() * proxyPool.length)]
        break
      case 'geographic':
        // In production, would consider geography
        nextProxy = proxyPool[Math.floor(Math.random() * proxyPool.length)]
        break
      default:
        nextProxy = proxyPool[0]
    }

    setCurrentProxy(nextProxy)
    
    const rotationRecord = {
      time: new Date().toISOString(),
      proxy: nextProxy,
      reason,
    }
    
    setRotationHistory(prev => [rotationRecord, ...prev.slice(0, 10)]) // Keep last 10

    return nextProxy
  }

  const addToPool = (proxy: string) => {
    if (!proxyPool.includes(proxy)) {
      setProxyPool(prev => [...prev, proxy])
    }
  }

  const removeFromPool = (proxy: string) => {
    setProxyPool(prev => prev.filter(p => p !== proxy))
    if (currentProxy === proxy) {
      rotateProxy('removed from pool')
    }
  }

  const clearPool = () => {
    setProxyPool([])
    setCurrentProxy(null)
  }

  const updateSettings = (newSettings: Partial<ProxyRotationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const getStats = () => ({
    totalProxies: proxyPool.length,
    currentProxy,
    rotationCount: rotationHistory.length,
    lastRotation: rotationHistory[0]?.time || null,
    strategy: settings.strategy,
  })

  return {
    // State
    settings,
    currentProxy,
    proxyPool,
    rotationHistory,
    
    // Actions
    rotateProxy,
    addToPool,
    removeFromPool,
    clearPool,
    updateSettings,
    
    // Stats
    getStats,
  }
}
