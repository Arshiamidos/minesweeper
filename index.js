const BMB = "B"//✳️
const CLR = "C"//⬜️
const UNT = "U"//⏹
//⬜️
//1️⃣
//2️⃣
//3️⃣
//4️⃣
//5️⃣
//6️⃣
//7️⃣
//8️⃣
//✳️
//⏹

board = [
    //Bomb , Clear , Untouched 
    //A   B   C   D   E   F   G   H   I   J
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//0
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//1
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//2
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//3
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//4
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//5
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//6
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//7
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//8
    [UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT, UNT,],//9
]

process.stdin.setEncoding('utf8');
process.stdin.resume();

process.stdin.on('data', (data) => {

    data = data + ""
    data == 'z\n' && process.exit(1);
    if(data=='a\n') process.stdout.write('AA')

    
    if (data.length != 2)
        update()
    if ("" + parseInt(data[0]) === "NaN" || "" + parseInt(data[1]) === "NaN")
        update()

    let x = parseInt(data[0])
    let y = parseInt(data[1])
    unlockBoard(x,y)
    update()
 
});
function isValidPosition(x,y){
    if(x>board[0].length-1 || x<0) return false;
    if(y>board.length-1 || y <0) return false;
    return true
}
function hasBomb(x,y){
    if(board[y][x]===BMB)
        return true;
    return false
}

function isBombNear(x,y){
    let calcAllBombNear=0
    isValidPosition(x-1,y-1,'search') && hasBomb(x-1,y-1) && calcAllBombNear++;
    isValidPosition(x-1, y ,'search') && hasBomb(x-1, y ) && calcAllBombNear++;
    isValidPosition(x-1,y+1,'search') && hasBomb(x-1,y+1) && calcAllBombNear++;
    isValidPosition(x  ,y+1,'search') && hasBomb(x  ,y+1) && calcAllBombNear++;
    isValidPosition(x  ,y-1,'search') && hasBomb(x  ,y-1) && calcAllBombNear++;
    isValidPosition(x+1,y+1,'search') && hasBomb(x+1,y+1) && calcAllBombNear++;
    isValidPosition(x+1, y ,'search') && hasBomb(x+1, y ) && calcAllBombNear++;
    isValidPosition(x+1,y-1,'search') && hasBomb(x+1,y-1) && calcAllBombNear++;

    return calcAllBombNear;
}
//select or search
function unlockBoard(x,y,type="select"){
    
   if(!isValidPosition(x,y)){
       return;
   }

    
    if([CLR,"1","2","3","4","5","6","7","8",].includes(board[y][x])) return;

    if(board[y][x]==BMB && type==="select"){
        process.stdout.write('\n👹 You Lose !!! 👹\n')
        process.exit()
    }
    if(board[y][x]==BMB && type==="search"){
        return;
    }
    if(type==="search"){
        if(isBombNear(x,y)==0){
            board[y][x]=CLR        
        }else{
            board[y][x]=isBombNear(x,y)+""
            return;
        }

    }
    else
        board[y][x]=CLR        
    /*  if(type==="select"){

        if(isBombNear(x,y)==0){
        }else{
            board[y][x]=CLR        
            board[y][x]=isBombNear(x,y)+""
            
        }
    } */
    

   
    unlockBoard(x-1,y-1,'search')
    unlockBoard(x-1,y  ,'search')
    unlockBoard(x-1,y+1,'search')
    unlockBoard(x  ,y+1,'search')
    unlockBoard(x  ,y-1,'search')
    unlockBoard(x+1,y+1,'search')
    unlockBoard(x+1,y  ,'search')
    unlockBoard(x+1,y-1,'search')

}
function showBoard() {

    process.stdout.cursorTo(0, 0)
    process.stdout.write("  ")
    for (let x = 0; x < board.length; x++) {
        process.stdout.write(" " + x + "")
    }

    process.stdout.write("\n")

    for (let y = 0; y < board.length; y++) {

        process.stdout.cursorTo(0, y + 1)
        process.stdout.write("" + y)
        for (let x = 0; x < board[0].length; x++) {

            if (board[y][x] == UNT || board[y][x] == BMB ) {
                process.stdout.write(" ⏹")
            }
            /* else if (board[y][x] == BMB) {
                process.stdout.write(" ✳️")
            } */
            else if (board[y][x] == CLR) {
                process.stdout.write(" ⬜️")
            }
            else if (board[y][x] == 1) {
                process.stdout.write(" 1️⃣")
            }
            else if (board[y][x] == 2) {
                process.stdout.write(" 2️⃣")
            }
            else if (board[y][x] == 3) {
                process.stdout.write(" 3️⃣")
            }
            else if (board[y][x] == 4) {
                process.stdout.write(" 4️⃣")
            }
            else if (board[y][x] == 5) {
                process.stdout.write(" 5️⃣")
            }
            else if (board[y][x] == 6) {
                process.stdout.write(" 6️⃣")
            }
            else if (board[y][x] == 7) {
                process.stdout.write(" 7️⃣")
            }
            else if (board[y][x] == 8) {
                process.stdout.write(" 8️⃣")
            }
            


        }
    }
    process.stdout.write('\n\n')
}
function makeRandomBomb(n) {

    total = board.length * board[0].length
    let rn = [...Array(total).keys()]
    for (let index = 0; index < n; index++) {
        rn[Math.floor(Math.random() * total)] = BMB// random number
    }

    for (let x = 0; x < board[0].length; x++) {
        for (let y = 0; y < board.length; y++) {
            let i = board.length * y + x
            if (rn[i] == BMB)
                board[y][x] = BMB
        }
    }

}
function update() {
    process.stdout.cursorTo(0, 0);
    process.stdout.write('\033[?25h');
    process.stdout.write('\033[0m');
    process.stdout.write('\033[J');

    showBoard();
    process.stdout.write("XY=>??")

}
makeRandomBomb(10)
update();
