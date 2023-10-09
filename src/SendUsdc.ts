import {
  NftStoreConnectionService,
  Pubkeys,
} from '@phantasia/nft-store-interface';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';

export async function sendUsdc(
  sender: PublicKey,
  receiver: PublicKey,
  usdcAmount: number
) {
  const usdcMint = Pubkeys.getUsdcMint();

  const senderTokenAccount = await getAssociatedTokenAddressSync(
    new PublicKey(usdcMint),
    sender
  );

  const receiverTokenAccount = await getAssociatedTokenAddressSync(
    usdcMint,
    receiver
  );

  const ixs = [];
  const connection = NftStoreConnectionService.getConnection();

  ixs.push(
    createTransferCheckedInstruction(
      senderTokenAccount,
      usdcMint,
      receiverTokenAccount,
      sender,
      Math.ceil(usdcAmount * Math.pow(10, 6)),
      6
    )
  );

  await addCreateAtaIx(
    receiverTokenAccount,
    usdcMint,
    receiver,
    ixs,
    connection,
    new PublicKey('49pgJ4d5QzPj65qdXfC6CUiyo2CadQabZbTf1z1Mvx2z')
  );

  const tx = new Transaction({
    feePayer: new PublicKey('49pgJ4d5QzPj65qdXfC6CUiyo2CadQabZbTf1z1Mvx2z'),
  });

  tx.add(...ixs);

  return tx;
}

async function addCreateAtaIx(
  ata: PublicKey,
  mint: PublicKey,
  destination: PublicKey,
  Ixs: TransactionInstruction[],
  connection: Connection,
  feePayer: PublicKey
) {
  const ataInfo = await connection.getAccountInfo(ata);

  const doesAtaExist = ataInfo?.owner !== undefined;
  if (!doesAtaExist) {
    const createAtaIx = createAssociatedTokenAccountInstruction(
      feePayer,
      ata,
      destination,
      mint
    );
    Ixs.push(createAtaIx);
  }
}
