var moveBlockDown = 0;



function moveBlocks() {
	if (isWork){
		if(moveBlockDown<100) {

			moveBlockDown+=2;
			for(var j=0;j<numberOfRow;j++){
				for (var i=0;i<number_blocks_in_row;i++){
					blocks[j][i].block_y +=1;
				}
			}
		}
		else {
			moveBlockDown=0;
			isWork=false;
		}
	}	
}

var intervalMoveBlocks;