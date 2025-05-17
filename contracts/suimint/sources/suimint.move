module suimint::nft {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::url::{Self, Url};
    use std::string::{Self, String};
    use sui::event;

    /// The type identifier of SuiMint NFT
    struct SUIMINT has drop {}

    /// The NFT type
    struct SuiMintNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        price: u64
    }

    /// Events
    struct MintEvent has copy, drop {
        name: String,
        price: u64
    }

    /// Errors
    const EInvalidPrice: u64 = 0;
    const EInsufficientPayment: u64 = 1;

    /// Dev wallet address
    const DEV_WALLET: address = @0x51a06bb22d345907fce4cd86db094eaf170aef957423fbb39ef1801373b92685;

    /// Create a new NFT collection
    fun init(ctx: &mut TxContext) {
        let nft = SuiMintNFT {
            id: object::new(ctx),
            name: string::utf8(b"SuiMint NFT"),
            description: string::utf8(b"A unique NFT minted on Sui"),
            url: url::new_unsafe_from_bytes(b"https://suimint.com/nft.png"),
            price: 100000 // 0.0001 SUI
        };
        transfer::share_object(nft);
    }

    /// Mint a new NFT
    public entry fun mint(
        payment: &mut Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let price = 100000; // 0.0001 SUI
        assert!(price > 0, EInvalidPrice);
        
        let payment_amount = coin::value(payment);
        assert!(payment_amount >= price, EInsufficientPayment);

        // Split the payment to get the dev fee
        let dev_fee = coin::split(payment, price, ctx);
        
        // Transfer dev fee to dev wallet
        transfer::public_transfer(dev_fee, DEV_WALLET);

        // Create the NFT
        let nft = SuiMintNFT {
            id: object::new(ctx),
            name: string::utf8(b"SuiMint NFT"),
            description: string::utf8(b"A unique NFT minted on Sui"),
            url: url::new_unsafe_from_bytes(b"https://suimint.com/nft.png"),
            price
        };

        // Transfer the NFT to the sender
        transfer::transfer(nft, tx_context::sender(ctx));

        // Emit mint event
        event::emit(MintEvent {
            name: string::utf8(b"SuiMint NFT"),
            price
        });
    }
} 