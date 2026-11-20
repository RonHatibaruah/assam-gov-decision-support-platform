import crypto from "node:crypto";

/**
 * Standard Merkle Tree implementation for off-chain batch aggregation & blockchain anchoring
 */
export function sha256(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export function hashBatch(batchData: object): string {
  const jsonStr = JSON.stringify(batchData, Object.keys(batchData).sort());
  return sha256(jsonStr);
}

export class MerkleTree {
  public leaves: string[];
  public layers: string[][];

  constructor(leaves: string[]) {
    this.leaves = leaves.map(l => (l.startsWith("0x") ? l.slice(2) : l));
    this.layers = [this.leaves];
    this.buildTree();
  }

  private buildTree() {
    let currentLayer = this.layers[0];
    if (currentLayer.length === 0) {
      this.layers = [[sha256("EMPTY_TREE")]];
      return;
    }

    while (currentLayer.length > 1) {
      const nextLayer: string[] = [];
      for (let i = 0; i < currentLayer.length; i += 2) {
        if (i + 1 < currentLayer.length) {
          const combined = currentLayer[i] + currentLayer[i + 1];
          nextLayer.push(sha256(combined));
        } else {
          // Odd number of leaves: hash with itself
          const combined = currentLayer[i] + currentLayer[i];
          nextLayer.push(sha256(combined));
        }
      }
      this.layers.push(nextLayer);
      currentLayer = nextLayer;
    }
  }

  public getRoot(): string {
    const top = this.layers[this.layers.length - 1];
    return top && top[0] ? `0x${top[0]}` : `0x${sha256("EMPTY")}`;
  }

  public getProof(leafIndex: number): string[] {
    const proof: string[] = [];
    if (leafIndex < 0 || leafIndex >= this.leaves.length) {
      return proof;
    }

    let currentIndex = leafIndex;
    for (let i = 0; i < this.layers.length - 1; i++) {
      const layer = this.layers[i];
      const isRightNode = currentIndex % 2 === 1;
      const pairIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;

      if (pairIndex < layer.length) {
        proof.push(`0x${layer[pairIndex]}`);
      } else {
        proof.push(`0x${layer[currentIndex]}`);
      }

      currentIndex = Math.floor(currentIndex / 2);
    }

    return proof;
  }

  public static verifyProof(leaf: string, proof: string[], root: string): boolean {
    let current = leaf.startsWith("0x") ? leaf.slice(2) : leaf;
    for (const p of proof) {
      const cleanP = p.startsWith("0x") ? p.slice(2) : p;
      // In canonical order or simple pair hashing:
      const combined = current < cleanP ? current + cleanP : cleanP + current;
      current = sha256(combined);
    }
    const cleanRoot = root.startsWith("0x") ? root.slice(2) : root;
    return current.toLowerCase() === cleanRoot.toLowerCase();
  }
}
