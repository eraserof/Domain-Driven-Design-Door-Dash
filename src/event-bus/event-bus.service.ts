import { Injectable } from "@nestjs/common";
import { EventEmitter } from 'events';

@Injectable()
export class EventBus {
    eventBus = new EventEmitter();
}