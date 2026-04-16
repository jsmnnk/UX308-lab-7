let order = {
  item: null,
  size: null,
  extra: null,
  drink: false
};

export function handleInput(sInput) {
  const input = sInput.toLowerCase();
  let responses = [];
  let orderComplete = false;

  // greeting
  if (input.includes("hello") || input.includes("hi")) {
    responses.push("Hey! Welcome to Jasmine's Pizza 🍕");
    responses.push("You can order pizza or pasta. Just tell me what you want!");
    return { responses, orderComplete };
  }

  // detect item
  if (input.includes("pizza")) {
    order.item = "pizza";
    responses.push("Nice choice 😋 What size? (small, medium, large)");
  }

  if (input.includes("pasta")) {
    order.item = "pasta";
    responses.push("Good pick! What size pasta? (small, medium, large)");
  }

  // detect size
  if (["small", "medium", "large"].some(s => input.includes(s))) {
    const size = ["small", "medium", "large"].find(s => input.includes(s));
    order.size = size;

    if (order.item === "pizza") {
      responses.push(`Got it, a ${size} pizza.`);
      responses.push("What topping? (pepperoni or veggie)");
    } else if (order.item === "pasta") {
      responses.push(`Nice, ${size} pasta.`);
      responses.push("What sauce? (alfredo or tomato)");
    }
  }

  // ✅ FIXED: extract only correct topping/sauce
  if (input.includes("pepperoni")) {
    order.extra = "pepperoni";
    responses.push("Perfect 👍");
    responses.push("Would you like a drink?");
  } 
  else if (input.includes("veggie")) {
    order.extra = "veggie";
    responses.push("Perfect 👍");
    responses.push("Would you like a drink?");
  } 
  else if (input.includes("alfredo")) {
    order.extra = "alfredo";
    responses.push("Perfect 👍");
    responses.push("Would you like a drink?");
  } 
  else if (input.includes("tomato")) {
    order.extra = "tomato";
    responses.push("Perfect 👍");
    responses.push("Would you like a drink?");
  }

  // drink
  if (input.includes("yes")) {
    order.drink = true;
    responses.push("Added a drink 🥤");
  }

  if (input.includes("no")) {
    order.drink = false;
  }

  // complete order
  if (order.item && order.size && order.extra) {
    responses.push("Your order is confirmed! 🎉");
    responses.push(
      `You ordered a ${order.size} ${order.item} with ${order.extra}${order.drink ? " and a drink" : ""}.`
    );

    orderComplete = true;

    // reset
    order = { item: null, size: null, extra: null, drink: false };
  }

  // fallback
  if (responses.length === 0) {
    responses.push("Hmm, I didn’t catch that 🤔");
    responses.push("Try saying 'I want a large pizza'");
  }

  return { responses, orderComplete };
}

export function clearInput() {
  order = { item: null, size: null, extra: null, drink: false };
}