export interface Observer<TEvent> {
  update(event: TEvent): void;
}

export interface Subject<TEvent> {
  attach(observer: Observer<TEvent>): void;
  detach(observer: Observer<TEvent>): void;
  notify(event: TEvent): void;
}


