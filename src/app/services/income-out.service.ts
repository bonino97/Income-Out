import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IncomeOut } from '../models/income-out.model';
import { LoginComponent } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class IncomeOutService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  createIncomeOut(incomeOut: IncomeOut) {
    const uid = this.authService.user.uid;
    return this.firestore
      .doc(`${uid}/income-out`)
      .collection('items')
      .add({ ...incomeOut });
  }

  initIncomesOutsListener(uid: string) {
    return this.firestore
      .collection(`${uid}/income-out/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => {
            return {
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as any),
            };
          })
        )
      );
  }

  deleteIncomeOutItem(uid: string) {
    const userId = this.authService.user.uid;
    return this.firestore.doc(`${userId}/income-out/items/${uid}`).delete();
  }
}
