function setState(store, newState, afterUpdateCallback) {
  store.state = { ...store.state, ...newState }
  store.listeners.forEach(listener => {
    listener.run(store.state)
  })
  afterUpdateCallback && afterUpdateCallback()
}

function useCustom(store, React, mapState, mapActions) {
  const [, originalHook] = React.useState(Object.create(null))
  const state = mapState ? mapState(store.state) : store.state
  const actions = React.useMemo(
    () => (mapActions ? mapActions(store.actions) : store.actions),
    [mapActions, store.actions]
  )

  React.useEffect(() => {
    const newListener = { oldState: {} }
    newListener.run = mapState
      ? newState => {
        const mappedState = mapState(newState)
        if (mappedState !== newListener.oldState) {
          newListener.oldState = mappedState
        }
      }
      : originalHook
    store.listeners.push(newListener)
    newListener.run(store.state)
    return () => {
      store.listeners = store.listeners.filter(listener => listener !== newListener)
    }
  }, [])
  return [state, actions]
}
