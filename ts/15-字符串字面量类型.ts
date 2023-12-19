type EventName = 'click' | 'scroll' | 'mounsmove'

function listen(event: EventName): EventName {
  return event
}

listen('click')
listen('dbclick')
