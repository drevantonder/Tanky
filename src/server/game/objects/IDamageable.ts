export interface IDamageable {
    health: number;
    damage(amount: number);
}

export function isDamageable(object: any): object is IDamageable {
    return object && object.health !== undefined && object.damage !== undefined;
}
