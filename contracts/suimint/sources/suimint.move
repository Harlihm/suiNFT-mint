module suimint::nft {

    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::balance;
    use sui::sui;
    use sui::string;

    const MINT_FEE: u64 = 100_000_000; // 0.1 SUI (in MIST)

    /// NFT structure
    struct MyNFT has key, store {
        id: UID,
        name: string::String,
        creator: address,
    }

    /// Entry function: Mints the NFT for a 0.1 SUI fee
    public entry fun mint_nft(user_payment: Coin<sui::SUI>, ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        let fee = coin::split(&mut user_payment, MINT_FEE);
        
        // Refund any extra SUI
        coin::transfer(user_payment, sender);

        // Send fee to creator (you)
        let creator_address = @0x51a06bb22d345907fce4cd86db094eaf170aef957423fbb39ef1801373b92685;
        coin::transfer(fee, creator_address);

        // Mint the NFT
        let nft = MyNFT {
            id: object::new(ctx),
            name: string::utf8(b"My First Sui NFT"),
            creator: creator_address,
        };

        transfer::transfer(nft, sender);
    }
}
