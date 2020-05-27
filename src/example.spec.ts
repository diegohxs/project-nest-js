/*describe('my test', ()=>{
    it('returns true', ()=>{
        expect(true).toEqual(true);
    });
});


//feature
class FriendList{
    friends = [];

    addFriend(name){
        this.friends.push(name);
        this.announceFriendShip(name);
    }
    announceFriendShip(name){
        global.console.log(`${name} is now a friend!`);
    }
    removeFriend(name){
        const idx = this.friends.indexOf(name);
        if(idx === -1){
            throw new Error('Friend not found!');
        }
        this.friends.splice(idx,1);
    }



}

//test

describe('FriendList', ()=>{
 let friendsList;

 beforeEach(()=>{
     friendsList = new FriendList();
 });


    it('initializes friend list', () =>{
        expect(friendsList.friends.length).toEqual(0);
    });
    it('add a friend to the list', ()=>{
        friendsList.addFriend('Diego');
        expect(friendsList.friends.length).toEqual(1);
    });

    it('announce friendshio', ()=>{
        friendsList.announceFriendShip = jest.fn();
        expect(friendsList.announceFriendShip).not.toHaveBeenCalled();
        friendsList.addFriend('Diego');
        expect(friendsList.announceFriendShip).toHaveBeenCalled();
    });

    describe('remove Friends', ()=>{
        it('remove a friend from the list',()=>{
            friendsList.addFriend('Diego');
            expect(friendsList.friends[0]).toEqual('Diego');
            friendsList.removeFriend('Diego');
            expect(friendsList.friends[0]).toBeUndefined();
        });
        it('Thrown not exist',()=>{
          expect(()=>  friendsList.removeFriend('Diego')).toThrow(Error);

        });
    });
});

*/