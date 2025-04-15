export type Level = 'V0' | 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7';

export class User {
    private children: User[] = [];
    private level: Level = 'V0';
    private dailyProfit: number = 0;

    constructor(
        public readonly id: string,
        private stake: number,
        private dailyProfitRate: number = 0.01
    ) {
        this.calculateDailyProfit();
    }

    private calculateDailyProfit(): void {
        this.dailyProfit = this.stake * this.dailyProfitRate;
    }

    addChild(child: User): void {
        this.children.push(child);
        this.updateLevel();
    }

    getDirectReferralCount(): number {
        return this.children.length;
    }

    getTotalTeamSize(): number {
        return this.children.reduce((sum, child) =>
            sum + 1 + child.getTotalTeamSize(), 0);
    }

    getLevel(): Level {
        return this.level;
    }

    getDailyProfit(): number {
        return this.dailyProfit;
    }

    getChildren(): User[] {
        return [...this.children];
    }

    private getLevelQualifiedChildrenCount(level: Level): number {
        return this.children.filter(child => child.getLevel() === level).length;
    }

    private updateLevel(): void {
        if (this.qualifiesForV7()) this.level = 'V7';
        else if (this.qualifiesForV6()) this.level = 'V6';
        else if (this.qualifiesForV5()) this.level = 'V5';
        else if (this.qualifiesForV4()) this.level = 'V4';
        else if (this.qualifiesForV3()) this.level = 'V3';
        else if (this.qualifiesForV2()) this.level = 'V2';
        else if (this.qualifiesForV1()) this.level = 'V1';
        else this.level = 'V0';
    }

    private qualifiesForV1(): boolean {
        return this.getDirectReferralCount() >= 5;
    }

    private qualifiesForV2(): boolean {
        return this.getDirectReferralCount() >= 5 && this.getTotalTeamSize() >= 50;
    }

    private qualifiesForV3(): boolean {
        const v2ChildrenFromDifferentBranches = new Set(
            this.children
                .filter(child => child.getLevel() === 'V2')
                .map(child => child.id)
        ).size;
        return v2ChildrenFromDifferentBranches >= 2;
    }

    private qualifiesForV4(): boolean {
        const v3ChildrenFromDifferentBranches = new Set(
            this.children
                .filter(child => child.getLevel() === 'V3')
                .map(child => child.id)
        ).size;
        return v3ChildrenFromDifferentBranches >= 2;
    }

    private qualifiesForV5(): boolean {
        return this.getLevelQualifiedChildrenCount('V4') >= 2;
    }

    private qualifiesForV6(): boolean {
        return this.getLevelQualifiedChildrenCount('V5') >= 2;
    }

    private qualifiesForV7(): boolean {
        return this.getLevelQualifiedChildrenCount('V6') >= 2;
    }
}
