import { TestBed, inject } from '@angular/core/testing';

import { TickerwebsocketService } from './tickerwebsocket.service';

describe('TickerwebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TickerwebsocketService]
    });
  });

  it('should ...', inject([TickerwebsocketService], (service: TickerwebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
