const { ccclass, property } = cc._decorator;

/**
 * Manages channel switching behavior for game objects
 */
@ccclass
export default class ChannelSwitchManager extends cc.Component {
    @property(cc.Integer)
    currentChannel: number = 0;

    @property(cc.Integer)
    maxChannels: number = 3;

    @property(cc.Node)
    channelIndicator: cc.Node = null;

    onLoad() {
        // Initialize channel manager
        this.currentChannel = 0;
    }

    start() {
        this.updateChannelDisplay();
    }

    switchChannel(channelIndex: number) {
        if (channelIndex >= 0 && channelIndex < this.maxChannels) {
            this.currentChannel = channelIndex;
            this.updateChannelDisplay();
            this.node.emit('channel-switched', channelIndex);
        }
    }

    nextChannel() {
        const next = (this.currentChannel + 1) % this.maxChannels;
        this.switchChannel(next);
    }

    previousChannel() {
        const prev = (this.currentChannel - 1 + this.maxChannels) % this.maxChannels;
        this.switchChannel(prev);
    }

    private updateChannelDisplay() {
        if (this.channelIndicator) {
            // Update visual indicator
            this.channelIndicator.opacity = 255;
        }
    }
}
